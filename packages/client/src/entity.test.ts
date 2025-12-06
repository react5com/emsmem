import { describe, it, before, after } from "node:test";
import * as assert from 'node:assert/strict';
import ModuleFactory from "@emsmem/native";
import { type IRuntimeModule } from "./runtime_module.interface.js";
import { scope } from "./scope.js";

describe("Entity", () => {
  let Module: IRuntimeModule;
  let release_mem: (ptr: number) => void;
  let hello_from_native: () => number;

  before(async () => {
    Module = (await ModuleFactory()) as IRuntimeModule;
    release_mem = Module.cwrap('release_mem', null, ['number']);
    hello_from_native = Module.cwrap('hello_from_native', 'number', []);
  });
  after(() => {
    Module.ccall('lsan_check_now', null, [], []);
  });
  it("should return the correct name", async () => {
    using repo = new Module.Repository();
    const name = repo.getName();
    assert.equal(name, "MyRepository");
  });
  it("should return the correct indexes from a function", async () => {
    const indexes = Module.getIndexes();
    assert.equal(indexes.size(), 3);
    assert.equal(indexes.get(0), 4);
    assert.equal(indexes.get(1), 5);
    assert.equal(indexes.get(2), 6);
    indexes.delete();
  });
  it("with try finally", () => {
    let indexes;
    try {
      indexes = Module.getIndexes();
      const i0 = indexes.get(0);
    } finally {
      indexes?.delete();
    }
  });
  it("should return the correct indexes from a repo method", async () => {
    using repo = new Module.Repository();
    const indexes = repo.getIndexes();
    assert.equal(indexes.size(), 3);
    assert.equal(indexes.get(0), 1);
    assert.equal(indexes.get(1), 2);
    assert.equal(indexes.get(2), 3);
    indexes.delete();
  });
  it("should return the correct x value", async () => {
    const entity = new Module.Entity(42);
    console.log("entity", entity);
    assert.equal(entity.getX(), 42);
    entity.delete();
  });
  it("should release vector", () => {
    using vec = new Module.EntityVector();
    using entity = new Module.Entity(5);
    vec.push_back(entity);
    assert.equal(vec.size(), 1);
    using e = vec.get(0);
    assert.equal(e?.getX(), 5);
  });
  it("should release repository", () => {
    using repo = new Module.Repository();
    const allEntities = repo.getAllEntities();
    assert.equal(allEntities?.size(), 1);
    using el = allEntities?.get(0);
    assert.equal(el?.getX(), 1);
  });

  it("should get first entity by reference", () => {
    using repo = new Module.Repository();
    const entity = repo.getFirstEntity();
    assert.equal(entity.getX(), 1);
  });

  it("should get first entity by value", () => {
    using repo = new Module.Repository();
    using entity = repo.getFirstEntityVal();
    assert.equal(entity.getX(), 1);
  });

  it("hello_from_native should return correct string", () => {
    const resultPtr = hello_from_native();
    const resultStr = Module.UTF8ToString(resultPtr);
    assert.equal(resultStr, "Hello from native code!");
    release_mem(resultPtr);
  });

  it("hello_from_native with scope guard", () => {
    scope(release_mem, defer => {
      const resultPtr = hello_from_native();
      defer(resultPtr);
      const resultStr = Module.UTF8ToString(resultPtr);
      assert.equal(resultStr, "Hello from native code!");
    });
  });

  it("js_callback should invoke JS callback from native code", () => {
    return new Promise<void>((resolve) => {
      function callback(msgPtr: number) {
        const msgStr = Module.UTF8ToString(msgPtr);
        console.log(msgStr)
        assert.equal(msgStr, "Callback called from native code");
        resolve();
      }
      const cbPtr = Module.addFunction(callback, 'vp');
      Module.ccall('js_callback', null, ['number'], [cbPtr]);
      Module.removeFunction(cbPtr);
    });
  });
});
