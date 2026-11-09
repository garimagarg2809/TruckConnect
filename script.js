// Get the form and loads section
let loadForm = document.getElementById("loadForm");
let loadsList = document.getElementById("loadsList");

// Get saved loads from browser storage
let loads = JSON.parse(localStorage.getItem("truckLoads")) || [];
let selectedLoadIndex = null;

// Function to display available loads
function displayLoads() {

    loadsList.innerHTML = "";

    if (loads.length === 0) {
        loadsList.innerHTML = "<p>No loads available yet.</p>";
        return;
    }

    loads.forEach(function(load, index) {

        let card = document.createElement("div");
        card.className = "load-card";

        let heading = document.createElement("h3");
        heading.textContent = load.material;

        let details = document.createElement("p");

        details.textContent =
            "Pickup: " + load.pickup +
            " | Drop: " + load.drop +
            " | Date: " + load.date +
            " | Time: " + load.time +
            " | Weight: " + load.weight + " tonnes" +
            " | Budget: ₹" + load.budget;

        let offerButton = document.createElement("button");

        offerButton.textContent = "Make an Offer";
        offerButton.className = "btn";

        offerButton.addEventListener("click", function() {

            selectedLoadIndex = index;

            document.getElementById("selectedLoad").textContent =
                "Selected Load: " + load.material +
                " (" + load.pickup + " to " + load.drop + ")";

            document.getElementById("truckForm").scrollIntoView({
                behavior: "smooth"
            });

        });

        card.appendChild(heading);
        card.appendChild(details);
        card.appendChild(offerButton);

        loadsList.appendChild(card);

    });
}

// Handle form submission
loadForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let newLoad = {

        material: document.getElementById("material").value,
        pickup: document.getElementById("pickup").value,
        drop: document.getElementById("drop").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        weight: document.getElementById("weight").value,
        budget: document.getElementById("budget").value

    };

    // Add new load
    loads.push(newLoad);

    // Save loads in browser storage
    localStorage.setItem("truckLoads", JSON.stringify(loads));

    alert("Load posted successfully!");

    // Clear the form
    loadForm.reset();

    // Display updated loads
    displayLoads();

});

// Show saved loads when website opens
displayLoads();
// Get the truck owner form
let truckForm = document.getElementById("truckForm");

// Get the offers display area
let offersList = document.getElementById("offersList");

// Get previously saved transport offers
let offers = JSON.parse(localStorage.getItem("truckOffers")) || [];

// Function to display transport offers
function displayOffers() {

    offersList.innerHTML = "";

    offers.forEach(function(offer) {

        let card = document.createElement("div");
        card.className = "load-card";

        let heading = document.createElement("h3");
        heading.textContent = "Truck: " + offer.truckNumber;

        let details = document.createElement("p");

        details.textContent =
            "Driver: " + offer.driverName +
            " | Capacity: " + offer.capacity + " tonnes" +
            " | Offered Price: ₹" + offer.offerPrice;

        card.appendChild(heading);
        card.appendChild(details);

        offersList.appendChild(card);

    });
}

// Handle truck owner form submission
truckForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let newOffer = {

        loadIndex: selectedLoadIndex,
        truckNumber: document.getElementById("truckNumber").value,
        capacity: document.getElementById("capacity").value,
        offerPrice: document.getElementById("offerPrice").value,
        driverName: document.getElementById("driverName").value

    };
if (selectedLoadIndex === null) {
    alert("Please select a load before submitting an offer!");
    return;
}

    // Save the new transport offer
    offers.push(newOffer);

    localStorage.setItem("truckOffers", JSON.stringify(offers));

    alert("Transport offer submitted successfully!");

    truckForm.reset();
    selectedLoadIndex = null;

    document.getElementById("selectedLoad").textContent =
       "Select a load above before submitting your offer.";

    displayOffers();

});

// Display saved offers when website opens
displayOffers();
console.log("TruckConnect JavaScript is working!");

