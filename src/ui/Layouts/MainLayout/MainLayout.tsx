import React from "react";

export const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div>
      <p>Aside Gestion Documentaria</p>
      {children}
    </div>
  );
};
