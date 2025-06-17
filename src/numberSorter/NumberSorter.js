import { useState } from 'react';
import styles from './style.module.css';

const NumberSorter = () => {
	const [inputValue, setInputValue] = useState('');
	const [numbers, setNumbers] = useState([]);
	const [sortedNumbers, setSortedNumbers] = useState([]);
	const [sortOrder, setSortOrder] = useState('asc');

	// Обработчик добавления числа
	const handleAddNumber = (e) => {
		e.preventDefault();
		if (inputValue.trim() && !isNaN(inputValue)) {
			setNumbers([...numbers, parseFloat(inputValue)]);
			setInputValue('');
		}
	};

	// Функция сравнения для сортировки
	const numberSorter = (a, b) => sortOrder === 'asc' ? a - b : b - a;

	// Обработчик сортировки
	const handleSort = () => {
		const sorted = [...numbers].sort(numberSorter);
		setSortedNumbers(sorted);
	};

	// Обработчик очистки
	const handleClear = () => {
		setNumbers([]);
		setSortedNumbers([]);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Сортировка чисел</h1>

			{/* Форма ввода числа */}
			<form onSubmit={handleAddNumber} className={styles.form}>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Введите число"
					className={styles.input}
				/>
				<button type="submit" className={styles.addButton}>
					Добавить
				</button>
			</form>

			{/* Управление сортировкой */}
			<div className={styles.controls}>
				<div className={styles.sortOptions}>
					<label>
						<input
							type="radio"
							checked={sortOrder === 'asc'}
							onChange={() => setSortOrder('asc')}
						/>
						По возрастанию
					</label>
					<label>
						<input
							type="radio"
							checked={sortOrder === 'desc'}
							onChange={() => setSortOrder('desc')}
						/>
						По убыванию
					</label>
				</div>
				<div className={styles.actionButtons}>
					<button onClick={handleSort} className={styles.sortButton}>
						Сортировать
					</button>
					<button onClick={handleClear} className={styles.clearButton}>
						Очистить
					</button>
				</div>
			</div>

			{/* Списки чисел */}
			<div className={styles.lists}>
				<div className={styles.listContainer}>
					<h3>Введенные числа</h3>
					{numbers.length === 0 ? (
						<p className={styles.empty}>Нет чисел</p>
					) : (
						<ul>
							{numbers.map((num, i) => (
								<li key={i}>{num}</li>
							))}
						</ul>
					)}
				</div>

				<div className={styles.listContainer}>
					<h3>Отсортированные числа</h3>
					{sortedNumbers.length === 0 ? (
						<p className={styles.empty}>Нет чисел</p>
					) : (
						<ul>
							{sortedNumbers.map((num, i) => (
								<li key={i}>{num}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default NumberSorter;