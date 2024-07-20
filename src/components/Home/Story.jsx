import React, { useState } from "react";

// components
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";

const Story = ({ story }) => {
  const [visible, setVisible] = useState(false);

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
      <span className="font-bold white-space-nowrap">Amy Elsner</span>
    </div>
  );

  return (
    <>
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        style={{ width: "400px" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}>
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Dialog>

      <div
        onClick={() => setVisible(true)}
        className="story flex min-w flex-column align-items-center gap-2 cursor-pointer"
        style={{ minWidth: "92px" }}>
        <div
          className="border-3 border-primary bg-no-repeat bg-cover bg-center h-5rem w-5rem border-circle"
          style={{ backgroundImage: `url(${story.user.image})` }}></div>
        <span className="text-sm font-medium">{story.user.name}</span>
      </div>
    </>
  );
};

export default Story;
