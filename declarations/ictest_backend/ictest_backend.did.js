export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addDoc' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'addPass' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'addSec' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    'getDoc' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'getDocList' : IDL.Func([], [IDL.Text], ['query']),
    'removeDoc' : IDL.Func([IDL.Text], [IDL.Text], []),
    'search_' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
