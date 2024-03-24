

 function alertListener(page, text) {
    page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);

        // Check if the dialog is a prompt
        if (dialog.type() === 'prompt') {
         
            await dialog.accept(text);
        } else {
            // For other types of dialogs, just accept them
            await dialog.accept();
        }
    });
}



module.exports = {alertListener};