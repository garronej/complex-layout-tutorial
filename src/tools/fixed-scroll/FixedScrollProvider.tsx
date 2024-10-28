/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-namespace */

import { createContext, useContext, useState, useEffect } from "react";
import { assert } from "tsafe/assert";
import { id } from "tsafe/id";
import { useFixedScrollOnElement } from "./useFixedScrollOnElement";
import { Evt, type StatefulEvt } from "evt";

type State = State.Enabled | State.Disabled;

namespace State {
  export type Enabled = {
    isEnabled: true;
    height: number;
    initialScrollPercentage: number;
    evtCurrentScrollPercentage: StatefulEvt<number>;
  };

  export type Disabled = {
    isEnabled: false;
  };
}

type ContextValue = {
  state: State;
  setState: (state: State) => void;
};

const context = createContext<ContextValue | undefined>(undefined);

export function FixedScrollProvider(props: { children: React.JSX.Element }) {
  const { children } = props;

  const [state, setState] = useState<State>(() =>
    id<State.Disabled>({ isEnabled: false })
  );

  return (
    <context.Provider value={{ state, setState }}>
      <FixedScrollProviderInner>{children}</FixedScrollProviderInner>
    </context.Provider>
  );
}

function FixedScrollProviderInner(props: { children: React.JSX.Element }) {
  const { children } = props;

  const { state } = useContextValue();

  if (!state.isEnabled) {
    return children;
  }


  return (
    <FixedScrollProviderInnerAssertIsEnabled>
      {children}
    </FixedScrollProviderInnerAssertIsEnabled>
  );
}

function FixedScrollProviderInnerAssertIsEnabled(props: {
  children: React.JSX.Element;
}) {
  const { children } = props;

  const { state } = useContextValue();

  assert(state.isEnabled);

  const { rootElementId, scrollPercentage } = useFixedScrollOnElement({
    height: state.height,
    initialScrollPercentage: state.initialScrollPercentage,
  });

  console.log({ scrollPercentage });

  useEffect(() => {
    state.evtCurrentScrollPercentage.state = scrollPercentage;
  }, [scrollPercentage, state.evtCurrentScrollPercentage]);


  return (
    <div id={rootElementId}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function useContextValue(): ContextValue {
  const contextValue = useContext(context);

  assert(contextValue !== undefined);

  return contextValue;
}

export function useFixedScroll(params: {
  height: number;
  initialScrollPercentage: number;
}) {
  const { height, initialScrollPercentage } = params;

  const { state, setState } = useContextValue();

  useEffect(() => {

    setState({
      isEnabled: true,
      height,
      initialScrollPercentage,
      evtCurrentScrollPercentage: Evt.create(initialScrollPercentage),
    });

    return () => {
      setState({
        isEnabled: false,
      });
    };
  }, []);

  const [currentScrollPercentage, setCurrentScrollPercentage] = useState(initialScrollPercentage);

  useEffect(()=> {

    if( !state.isEnabled ){
      return;
    }

    const { evtCurrentScrollPercentage } = state;

    const ctx = Evt.newCtx();

    evtCurrentScrollPercentage.attach(ctx, percentage => {
        setCurrentScrollPercentage(percentage);
    });

    return ()=> {
        ctx.done();
    };

  }, [state]);

  return { currentScrollPercentage };
}

export function useIsFixedScrollEnabled() {
  const { state } = useContextValue();

 const isFixedScrollEnabled=  state.isEnabled;

 return { isFixedScrollEnabled };
}
