import Row from "./accountsRow";
import AccountsGmailStyleRow from "./accountsGmailStyleRow";
import React from "react";
const AccountsSwipeable = ({ updateRender, item, index }) => {
  return (
    <AccountsGmailStyleRow fetchToggle={updateRender}>
      <Row item={item} />
    </AccountsGmailStyleRow>
  );
};

export default AccountsSwipeable;
