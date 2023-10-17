import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'addDoc' : ActorMethod<[string, string, string], string>,
  'addPass' : ActorMethod<[string, string, string, string], string>,
  'addSec' : ActorMethod<[string, string, string], string>,
  'getDoc' : ActorMethod<[string], string>,
  'getDocList' : ActorMethod<[], string>,
  'removeDoc' : ActorMethod<[string], string>,
  'search_' : ActorMethod<[string, string], string>,
}
