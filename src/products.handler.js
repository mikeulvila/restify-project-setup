/**
 * Class representing handlers for products
 */
class ProductsHandler {
	/**
	 * Sets private storage to empty array
	 */
	constructor() {
		this._storage = [];
	}

	_findProductById(id) {
		const product = this._storage.find(product => product.id === id);

		if (!product) {
			throw new Error('Product not found.');
		}
		return product;
	}

	/**
	 * Gets all products in the store
	 * @returns {Array} list of products
	 */
	getAll() {
		return this._storage;
	}

	/**
	 * Gets a single product by id
	 * @param {number} id - The product id
	 * @returns {object} The product
	 */
	getById(id) {
		return this._findProductById(id);
	}

	create(id, name) {
		const newProduct = {
			id: id,
			name: name
		};

		this._storage.push(newProduct);
	}

	update(id, name) {
		const foundProduct = this._findProductById(id);

		foundProduct.name = name;
		return foundProduct;
	}

	del(id) {
		const foundProduct = this._findProductById(id);

		this._storage.splice(this._storage.indexOf(foundProduct), 1);
	}
}

module.exports = new ProductsHandler();
