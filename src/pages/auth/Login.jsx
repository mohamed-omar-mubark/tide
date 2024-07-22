import React from "react";

// components
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

function App() {
  return (
    <div className="flex-center h-screen">
      <form>
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="email">Email</label>
          <InputText id="email" />
        </div>

        <div className="flex flex-column gap-2 mb-5">
          <label htmlFor="password">Password</label>
          <Password inputId="password" />
        </div>

        <Button className="w-full mb-3" label="Login" />
      </form>
    </div>
  );
}

export default App;
