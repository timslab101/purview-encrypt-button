Office.onReady(() => {
  console.log("Purview Encrypt Button loaded");
});

function markForEncryption(event) {
  console.log("Purview mark-for-encryption triggered");
  // TODO: Insert your logic to modify the message headers here
  Office.context.mailbox.item.body.prependAsync(
    "[Purview Encryption Requested]\n",
    { coercionType: Office.CoercionType.Text },
    () => event.completed()
  );
}

Office.actions.associate("markForEncryption", markForEncryption);
