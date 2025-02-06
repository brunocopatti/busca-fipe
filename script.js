const vehicleResultElement = document.getElementById("vehicleResult");
const vehicleTypeButtons = document.querySelectorAll(".vehicleTypeButton");

const apiUrl = "https://fipe.parallelum.com.br/api/v2";

vehicleTypeButtons.forEach((button) => {
	const vehicleType = button.dataset.value;

	button.addEventListener("click", async () => {
		const response = await fetch(`${apiUrl}/${vehicleType}/brands`);
		console.log(await response.json());
	});
});