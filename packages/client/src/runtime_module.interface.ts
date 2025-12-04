import { type EmbindModule } from "@emsmem/native";

export interface IRuntimeModule extends EmbindModule {
  ccall: (ident: string, returnType: string | null, argTypes: string[], args: any[]) => any;
  cwrap: (ident: string, returnType: string | null, argTypes: string[]) => any;
  UTF8ToString: (ptr: number) => string;
  addFunction: (func: Function, sig: string) => number;
  removeFunction: (funcPtr: number) => void;
}