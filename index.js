function showFullLinks() {
    const grams = document.querySelectorAll('main article');

    grams.forEach(function (gram) {
        const images = gram.querySelectorAll('img[srcset]');

        images.forEach(function (image) {
            // Get full url from srcset
            const fullURL = image.srcset.split(',').pop().split(' ').shift();

            // Image parent
            const parent = image.parentNode;

            // Remove protector
            const protector = parent.nextSibling;
            if (protector) {
                protector.parentNode.removeChild(protector);

            }

            if (parent.nodeName === 'DIV') {
                const link = document.createElement('a');
                link.href = fullURL;
                link.target = "_blank";
                link.appendChild(image);

                console.log(parent);

                // Add to parent
                parent.appendChild(link);
            }

        });
    });
}


// Select the node that will be observed for mutations
const target = document.querySelector('main > section > div');

// Options for the observer (which mutations to observe)
const config = {
    attributes: false,
    childList: true,
    subtree: false,
};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            showFullLinks();
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(target, config);

showFullLinks();
