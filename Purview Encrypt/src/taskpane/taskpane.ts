/* global Office console */

export async function insertText(text: string) {
  // Write text to the cursor point in the compose surface.
  try {
    Office.context.mailbox.item?.body.setSelectedDataAsync(
      text,
      { coercionType: Office.CoercionType.Text },
      (asyncResult: Office.AsyncResult<void>) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          throw asyncResult.error.message;
        }
      }
    );
  } catch (error) {
    console.log("Error: " + error);
  }
}
function addHeader(event) {
  Office.context.mailbox.item.internetHeaders.setAsync(
    { "X-Purview-Encrypt": "true" },
    (result) => {
      if (result.status === Office.AsyncResultStatus.Succeeded) {
        Office.context.mailbox.item.notificationMessages.addAsync("encryptHeaderAdded", {
          type: "informationalMessage",
          message: "Purview encryption header added.",
          icon: "icon16",
          persistent: false
        });
      } else {
        console.error(result.error);
      }
      event.completed();
    }
  );
}
