// get elements from our popup.html
const table = document.getElementById('xpath-table')
const mainButton = document.getElementById('get-xpaths-button');
// hookup an event listener to the button
// asynchronous request to get current tab DOM
mainButton.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: function getAllButtonXPaths() {
                // Function to generate Absolute XPath for a given element
                function getAbsoluteXPath(element) {

                    let xpath = '';
                    let currentElement = element;

                    // While we're not at the root element, we will keep going up in the DOM tree
                    while (currentElement !== document.documentElement) {
                        // Get number of siblings before the element to determine elements position
                        let siblingIndex = 1;
                        let sibling = currentElement.previousElementSibling;
                        while (sibling) {
                            siblingIndex++;
                            sibling = sibling.previousElementSibling;
                        }

                        // Append what we have found to the beginning
                        xpath = '/' + currentElement.tagName.toLowerCase() + '[' + siblingIndex + ']' + xpath;

                        // Go up the DOM tree
                        currentElement = currentElement.parentNode;
                    }

                    // Attach the root element and return
                    xpath = '/html' + xpath;
                    return xpath;
                }

                // Selector for button elements and input elements with button types
                const buttonSelectors = 'button, input[type="button"], input[type="submit"], input[type="reset"]';
                const buttons = document.querySelectorAll(buttonSelectors);

                // Initialize returning array
                const buttonData = [];

                // Iterate over all found button elements
                for (const button of buttons) {

                    // Determine the button type
                    let buttonType;
                    if (button.tagName === 'BUTTON') {
                        buttonType = '&lt;button&gt;';
                    } else {
                        buttonType = '&lt;input type="' + button.getAttribute('type') + '"&gt;';
                    }

                    // Get XPath for the button
                    const xpath = getAbsoluteXPath(button);

                    // Add button type and XPath to the buttonData array
                    buttonData.push([buttonType, xpath]);
                }

                return buttonData;
            },
        },
        (results) => {
            // Get the resulting array
            const buttonData = results[0].result;

            // For each element add a table row into the popup.js with number, button type, xpath
            let i = 0;
            table.innerHTML = `
                <tr>
                    <th>#</th>
                    <th class="type-col">Type</th>
                    <th class="xpath-col">XPath</th>
                </tr>
                `;
            for (const data of buttonData) {
                i += 1;

                let row = `
                <tr>
                    <td>${i}</td>
                    <td>${data[0]}</td>
                    <td class="xpath-col">${data[1]}</td>
                </tr>
                `;
                table.insertAdjacentHTML('beforeend', row);
            }
        }
    );
}, false);

