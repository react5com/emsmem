import ModuleFactory, { MainModule } from "@emsmem/native";

async function play(): Promise<MainModule> {
  const Module: MainModule = (await ModuleFactory()) as MainModule;

  using repo = new Module.Repository();
  const allEntities = repo.getAllEntities();
  // console.log("All entities size:", allEntities.size());
  for (let i = 0; i < allEntities.size(); i++) {
    using entity = allEntities.get(i);
    console.log(`Entity ${i} x value:`, entity?.getX());
  }
  const entity0 = repo.getFirstEntity();
  console.log("First entity x:", entity0.getX());

  using entity0val = repo.getFirstEntityVal();
  console.log("First entity x by value:", entity0val.getX());
  return Module;
}

play()
  .then((Module) => {
    console.log("Before sanity check");
    (Module as any).ccall('lsan_check_now', null, [], []);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
