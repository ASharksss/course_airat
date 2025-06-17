import React, { useState } from 'react';
import styles from './style.module.css';

function App() {
	// Состояние для данных студента
	const [studentData, setStudentData] = useState({
		fullName: '',
		group: ''
	});

	// Состояние для калькулятора
	const [calcData, setCalcData] = useState({
		value1: '',
		value2: '',
		result: '',
		history: []
	});

	const [currentForm, setCurrentForm] = useState(1);
	const [developerInfo, setDeveloperInfo] = useState('');
	const [error, setError] = useState('');

	// Обработчики для формы студента
	const handleStudentChange = (e) => {
		const { name, value } = e.target;
		setStudentData(prev => ({ ...prev, [name]: value }));
	};

	const handleStart = (e) => {
		e.preventDefault();
		if (studentData.fullName && studentData.group) {
			setCurrentForm(2);
		} else {
			alert('Пожалуйста, заполните все поля');
		}
	};

	// Обработчики для калькулятора
	const handleCalcChange = (e) => {
		const { name, value } = e.target;
		setCalcData(prev => ({ ...prev, [name]: value }));
		setError('');
	};

	const calculate = (operation) => {
		const num1 = parseFloat(calcData.value1);
		const num2 = parseFloat(calcData.value2);
		let result;

		try {
			switch (operation) {
				case '+':
					result = num1 + num2;
					break;
				case '-':
					result = num1 - num2;
					break;
				case '*':
					result = num1 * num2;
					break;
				case '/':
					if (num2 === 0) throw new Error('Деление на ноль невозможно');
					result = num1 / num2;
					break;
				case '^':
					result = Math.pow(num1, num2);
					break;
				case 'SQR':
					if (num1 < 0) throw new Error('Квадратный корень из отрицательного числа невозможен');
					result = Math.sqrt(num1);
					break;
				default:
					result = '';
			}

			const newResult = result.toString();
			setCalcData(prev => ({
				...prev,
				result: newResult,
				history: [...prev.history, newResult]
			}));
			setError('');
		} catch (err) {
			setError(err.message);
		}
	};

	const calculateSpecialFunction = () => {
		const num1 = parseFloat(calcData.value1);
		const num2 = parseFloat(calcData.value2);

		try {
			// Проверка на пустые поля
			if (isNaN(num1) || isNaN(num2)) {
				throw new Error('Пожалуйста, введите оба числа');
			}

			// Проверка деления на ноль
			if (num1 - num2 === 0) {
				throw new Error('Знаменатель (num1 - num2) не может быть равен нулю');
			}

			// Проверка кубического корня из отрицательного числа
			const product = num1 * num2;
			const cubicRoot = product < 0 ? -Math.pow(-product, 1/3) : Math.pow(product, 1/3);


			// Вычисление функции: (num1² * ∛(num1*num2)) / (num1 - num2)
			const numerator = Math.pow(num1, 2) * cubicRoot;

			const denominator = num1 - num2;
			const result = numerator / denominator;

			const newResult = result.toString();
			setCalcData(prev => ({
				...prev,
				result: newResult,
				history: [...prev.history, newResult]
			}));
			setError('');
		} catch (err) {
			setError(err.message);
			setCalcData(prev => ({ ...prev, result: 'Ошибка' }));
		}
	};

	const clearFields = () => {
		setCalcData(prev => ({ ...prev, value1: '', value2: '', result: '' }));
		setError('');
	};

	const showDeveloperInfo = () => {
		setDeveloperInfo('Разработчик: Мендыханов Айрат Ильшатович. Группа: 24174. 2025 год.');
		setTimeout(() => setDeveloperInfo(''), 3000);
	};

	const handleExit = () => {
		alert(`Студент: ${studentData.fullName} Группы: ${studentData.group} завершил работу с программой`);
		setCurrentForm(1);
	};

	return (
		<div className={styles.app}>
			{currentForm === 1 ? (
				<div className={styles.formContainer}>
					<h1>Ввод данных студента</h1>
					<form onSubmit={handleStart}>
						<div className={styles.formGroup}>
							<label htmlFor="fullName">ФИО:</label>
							<input
								type="text"
								id="fullName"
								name="fullName"
								value={studentData.fullName}
								onChange={handleStudentChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor="group">Номер группы:</label>
							<input
								type="text"
								id="group"
								name="group"
								value={studentData.group}
								onChange={handleStudentChange}
								required
							/>
						</div>
						<button type="submit" className={styles.startButton}>Старт</button>
					</form>
				</div>
			) : (
				<div className={styles.formContainer}>
					<h1>Калькулятор</h1>
					{error && <div className={styles.error}>{error}</div>}
					<div className={styles.inputGroup}>
						<label>1:</label>
						<input
							type="number"
							name="value1"
							value={calcData.value1}
							onChange={handleCalcChange}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>2:</label>
						<input
							type="number"
							name="value2"
							value={calcData.value2}
							onChange={handleCalcChange}
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>3:</label>
						<input
							type="text"
							name="result"
							value={calcData.result}
							readOnly
						/>
					</div>
					<div className={styles.buttonGroup}>
						<button type="button" onClick={() => calculate('+')}>+</button>
						<button type="button" onClick={() => calculate('-')}>-</button>
						<button type="button" onClick={() => calculate('*')}>*</button>
						<button type="button" onClick={() => calculate('/')}>/</button>
						<button type="button" onClick={() => calculate('^')}>^</button>
						<button type="button" onClick={() => calculate('SQR')}>SQR</button>
						<button type="button" onClick={clearFields}>C</button>
					</div>
					<div className={styles.specialButtons}>
						<button type="button" onClick={calculateSpecialFunction}>Функция</button>
						<button type="button" onClick={showDeveloperInfo}>Сведения о разработчике</button>
						<button type="button" onClick={handleExit}>Выход</button>
					</div>
					{developerInfo && <div className={styles.developerInfo}>{developerInfo}</div>}
					<div className={styles.history}>
						<label>4 (История результатов):</label>
						<ul>
							{calcData.history.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;