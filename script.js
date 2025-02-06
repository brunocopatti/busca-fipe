const vehicleResultElement = document.querySelector("#vehicleResult");
const vehicleTypeButtons = document.querySelectorAll(".vehicleType-button");

const dropdownBrands = new Dropdown("dropdown-brands");
const dropdownModels = new Dropdown("dropdown-models");
const dropdownYears = new Dropdown("dropdown-years");

const apiUrl = "https://fipe.parallelum.com.br/api/v2";

let vehicleType = null;

dropdownBrands.onSelect = (brandId) => {
	(async () => {
		const response = await fetch(`${apiUrl}/${vehicleType}/brands/${brandId}/models`);
		const models = await response.json();

		dropdownModels.setItems(models.map((model) => ({
			label: model.name,
			value: model.code
		})));
	})();
}

dropdownModels.onSelect = (modelId) => {
	const brandId = dropdownBrands.value;

	(async () => {
		const response = await fetch(`${apiUrl}/${vehicleType}/brands/${brandId}/models/${modelId}/years`);
		const models = await response.json();

		dropdownYears.setItems(models.map((model) => ({
			label: model.name,
			value: model.code
		})));
	})();
}

vehicleTypeButtons.forEach((button) => {
	vehicleType = button.dataset.value;

	button.addEventListener("click", async () => {
		if (!button.classList.contains("active")) {
			const response = await fetch(`${apiUrl}/${vehicleType}/brands`);
			const brands = await response.json();

			dropdownBrands.setItems(brands.map((brand) => ({
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
	.replaceWith(dropdownBrands.createElement("Selecione a marca"));

document.getElementById("dropdown-models")
	.replaceWith(dropdownModels.createElement("Selecione o modelo"));

document.getElementById("dropdown-years")
	.replaceWith(dropdownYears.createElement("Selecione o ano"));