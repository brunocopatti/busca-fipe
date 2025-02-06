class Dropdown {
	constructor(id) {
		this.id = id;
		this.value = null;
		this.element = null;
		this.onSelect = (value) => {};
	}

	createElement(label) {
		const dropdownElement = document.createElement("div");
		dropdownElement.id = this.id;
		dropdownElement.classList.add("dropdown");
	
		const dropdownButton = document.createElement("button");
		dropdownButton.textContent = label;
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
				this.close();
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
	
		this.element = dropdownElement;
		return dropdownElement;
	}

	setItems(items) {
		// items should be an array of objects with the properites label and value
		if (!this.element) {
			throw new Error("Initialize the Dropdown with createElement first");
		}

		const dropdownItemsElement = this.element.querySelector(".dropdown-items");
		dropdownItemsElement.innerHTML = "";
	
		items.forEach((item) => {
			const dropdownItem = document.createElement("li");
			dropdownItem.classList.add("dropdown-item");
			dropdownItem.tabIndex = 0;
	
			dropdownItem.textContent = item.label;

			dropdownItem.addEventListener("click", () => {
				// Closure example
				this.value = item.value;
				this.onSelect(item.value);
				this.close();
			});
	
			dropdownItemsElement.appendChild(dropdownItem);
		});
	}

	close() {
		this.element
			.querySelector(".dropdown-content")
			.classList
			.remove("active")
	}
}