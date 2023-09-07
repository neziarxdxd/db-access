document.addEventListener("DOMContentLoaded", function() {
    const selectButton = document.getElementById("selectButton");

    selectButton.addEventListener("click", function() {
        const startYear = parseInt(document.getElementById("startYear").value);
        const endYear = parseInt(document.getElementById("endYear").value);

        // Hide all content divs
        const contentDivs = document.querySelectorAll(".image-item");
        contentDivs.forEach(div => {
            div.style.display = "none";
        });

        // Show the appropriate content based on year range
        if (startYear <= 1899 && endYear >= 1902) {
            document.getElementById("content1").style.display = "block";
        }
		if (startYear <= 1942 && endYear >= 1945) {
            document.getElementById("content2").style.display = "block";
        }
		if (startYear <= 2020 && endYear >= 2020) {
            document.getElementById("content3").style.display = "block";
        }
        // Add more conditions for other year ranges as needed

        // Your popup code starts here
        const imageItems = document.querySelectorAll(".image-item img");
        const popup = document.createElement("div");
        popup.className = "popup";
        const popupContent = document.createElement("div");
        popupContent.className = "popup-content";
        popup.appendChild(popupContent);
        document.body.appendChild(popup);

        let fetchButton;

        imageItems.forEach(image => {
            image.addEventListener("click", function() {
                const title = this.getAttribute("data-title");
                const description = this.getAttribute("data-description");
                const src = this.getAttribute("src");

                // Clear the popup content
                popupContent.innerHTML = "";

                // Add the image and "Fetch More" button
                popupContent.innerHTML = `
                    <img src="${src}" alt="${title}">
                    <br>
                    <button id="fetchButton">Fetch More</button>
                `;

                popup.style.display = "flex";

                fetchButton = document.getElementById("fetchButton");

                fetchButton.addEventListener("click", function() {
                    // Fetch additional data from JSON when "Fetch More" is clicked
                    fetch("MilitaryHistory.json")
                        .then(response => response.json())
                        .then(data => {
                            // Find the image data based on the current image's src
                            const imageData = data.images.find(img => img.src === src);

                            // Add the title, description, and "Close" button
                            popupContent.innerHTML += `
                                <h3>${imageData.title}</h3>
                                <p>${imageData.description}</p>
                                <button id="closeButton">Close</button>
                            `;

                            const closeButton = document.getElementById("closeButton");
                            closeButton.addEventListener("click", function() {
                                popup.style.display = "none";
                            });
                        })
                        .catch(error => {
                            console.error("Error fetching data:", error);
                        });
                });
            });
        });

        // Close the popup when clicking outside the popup content
        popup.addEventListener("click", function(event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });

        // Your popup code ends here
    });
});
