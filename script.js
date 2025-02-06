const vehicleResultElement = document.querySelector("#vehicleResult");
const vehicleTypeButtons = document.querySelectorAll(".vehicleType-button");

const apiUrl = "https://fipe.parallelum.com.br/api/v2";

function createDropdownElement(name, id) {
	const dropdownElement = document.createElement("div");
	dropdownElement.id = id;
	dropdownElement.classList.add("dropdown");

	const dropdownButton = document.createElement("button");
	dropdownButton.textContent = name;
	dropdownButton.classList.add("dropdown-button");

	const dropdownContent = document.createElement("div");
	dropdownContent.classList.add("dropdown-content");

	const dropdownSearch = document.createElement("input");
	dropdownSearch.classList.add("dropdown-search");
	dropdownSearch.type = "search";

	const dropdownItemsElement = document.createElement("ul");
	dropdownItemsElement.classList.add("dropdown-items");

	dropdownButton.addEventListener("click", () => {
		dropdownContent.classList.toggle("active");
	});

	document.addEventListener("click", (event) => {
		const isClickInside = dropdownElement.contains(event.target);

		if (!isClickInside) {
			dropdownContent.classList.remove("active");
		}
	});

	dropdownSearch.addEventListener("input", (event) => {
		const input = event.target.value;

		const dropDownItems = dropdownElement.querySelectorAll(".dropdown-item");

		dropDownItems.forEach((item) => {
			if (item.textContent.toLowerCase().includes(input.toLowerCase())) {
				item.style.display = "";
			} else {
				item.style.display = "none";
			}
		});
	});

	dropdownElement.appendChild(dropdownButton);
	dropdownContent.appendChild(dropdownSearch);
	dropdownContent.appendChild(dropdownItemsElement);
	dropdownElement.appendChild(dropdownContent);

	return dropdownElement;
}

function setDropdownItems(dropdownId, items) {
	// items should be an array of objects with the properites label and value
	const dropdownElement = document.getElementById(dropdownId);
	const dropdownItemsElement = dropdownElement.querySelector(".dropdown-items");
	dropdownItemsElement.innerHTML = "";

	items.forEach((item) => {
		const dropdownItem = document.createElement("li");
		dropdownItem.classList.add("dropdown-item");
		dropdownItem.tabIndex = 0;

		dropdownItem.textContent = item.label;
		dropdownItem.dataset.value = item.value;

		dropdownItemsElement.appendChild(dropdownItem);
	});
}

vehicleTypeButtons.forEach((button) => {
	const vehicleType = button.dataset.value;

	button.addEventListener("click", async () => {
		if (!button.classList.contains("active")) {
			const response = await fetch(`${apiUrl}/${vehicleType}/brands`);
			const brands = await response.json();

			setDropdownItems("dropdown-brands", brands.map((brand) => ({
				label: brand.name,
				value: brand.code
			})));

			vehicleTypeButtons.forEach((button) => {
				button.classList.remove("active");
			});
			button.classList.add("active");
		}
	});
});

document.getElementById("dropdown-brands")
	.replaceWith(createDropdownElement("Selecione a marca", "dropdown-brands"));

document.getElementById("dropdown-models")
	.replaceWith(createDropdownElement("Selecione o modelo", "dropdown-models"));

document.getElementById("dropdown-years")
	.replaceWith(createDropdownElement("Selecione o ano", "dropdown-years"));