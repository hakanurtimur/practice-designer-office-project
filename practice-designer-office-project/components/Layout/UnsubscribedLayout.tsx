import React, { Fragment } from "react";
import UnsubscribeMainNavigation from "@/components/Layout/UnsubscribedMainNavigation";

const UnsubscribedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <header>
        <UnsubscribeMainNavigation />
      </header>
      {children}
    </Fragment>
  );
};

export default UnsubscribedLayout;
