// Assuming `usedCars` is already loaded from data.js
const carListings = document.getElementById("carListings");
const filterBtn = document.getElementById("filterBtn");

// Populate the car make and color filter options
function populateFilters() {
  const makes = [...new Set(usedCars.map((car) => car.make))];
  const colors = [...new Set(usedCars.map((car) => car.color))];

  const makeSelect = document.getElementById("make");
  const colorSelect = document.getElementById("color");

  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  });

  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colorSelect.appendChild(option);
  });
}

// Function to generate car cards dynamically
function generateCarCards(cars) {
  carListings.innerHTML = "";
  if (cars.length === 0) {
    carListings.textContent =
      "No cars match the filter criteria. Please try again.";
    return;
  }
  cars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.className = "car-card";
    carCard.innerHTML = `
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <p>Price: $${car.price}</p>
            <p>Mileage: ${car.mileage} miles</p>
            <p>Color: ${car.color}</p>
            <p>Gas Mileage: ${car.gasMileage}</p>
        `;
    carListings.appendChild(carCard);
  });
}

// Filter the car data based on user inputs
function filterCars() {
  const minYear = parseInt(document.getElementById("minYear").value) || 0;
  const maxYear = parseInt(document.getElementById("maxYear").value) || 9999;
  const selectedMakes = Array.from(
    document.getElementById("make").selectedOptions
  ).map((opt) => opt.value);
  const maxMileage =
    parseInt(document.getElementById("maxMileage").value) || Infinity;
  const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseInt(document.getElementById("maxPrice").value) || Infinity;
  const selectedColors = Array.from(
    document.getElementById("color").selectedOptions
  ).map((opt) => opt.value);

  const filteredCars = usedCars.filter(
    (car) =>
      car.year >= minYear &&
      car.year <= maxYear &&
      (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
      car.mileage <= maxMileage &&
      car.price >= minPrice &&
      car.price <= maxPrice &&
      (selectedColors.length === 0 || selectedColors.includes(car.color))
  );

  generateCarCards(filteredCars);
}

filterBtn.addEventListener("click", filterCars);

// Initial population of filters and car listings
populateFilters();
generateCarCards(usedCars);
