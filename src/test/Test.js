import { useState, useEffect } from 'react';
import styles from './style.module.css';

const ExcelTest = () => {
	// Вопросы и ответы
	const questions = [
		{
			id: 1,
			question: "Какой комбинацией клавиш можно вызвать диалоговое окно 'Вставить'?",
			options: [
				{ text: "Ctrl+V", isCorrect: false },
				{ text: "Ctrl+Shift+V", isCorrect: true },
				{ text: "Shift+V", isCorrect: false }
			]
		},
		{
			id: 2,
			question: "Какой функцией можно сложить все числа в диапазоне ячеек?",
			options: [
				{ text: "COUNT", isCorrect: false },
				{ text: "SUM", isCorrect: true },
				{ text: "AVERAGE", isCorrect: false }
			]
		},
		{
			id: 3,
			question: "Как называется документ Excel?",
			options: [
				{ text: "Таблица", isCorrect: false },
				{ text: "Книга", isCorrect: true },
				{ text: "Лист", isCorrect: false }
			]
		}
	];

	// Состояния
	const [currentForm, setCurrentForm] = useState('test');
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [answers, setAnswers] = useState([]);
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(null);
	const [timeRemaining, setTimeRemaining] = useState(300); // 5 минут в секундах

	// Таймер
	useEffect(() => {
		let timer;
		if (currentForm === 'test' && timeRemaining > 0) {
			timer = setInterval(() => {
				setTimeRemaining(prev => prev - 1);
			}, 1000);
		} else if (timeRemaining === 0) {
			finishTest();
		}
		return () => clearInterval(timer);
	}, [currentForm, timeRemaining]);

	// Обработчик выбора варианта ответа
	const handleOptionSelect = (optionIndex) => {
		setSelectedOption(optionIndex);
	};

	// Переход к следующему вопросу
	const handleNextQuestion = () => {
		const isCorrect = questions[currentQuestionIndex].options[selectedOption].isCorrect;
		setAnswers([...answers, {
			questionId: questions[currentQuestionIndex].id,
			isCorrect
		}]);

		setSelectedOption(null);

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			finishTest();
		}
	};

	// Завершение теста
	const finishTest = () => {
		setEndTime(new Date());
		setCurrentForm('results');
	};

	// Перезапуск теста
	const restartTest = () => {
		setCurrentForm('test');
		setCurrentQuestionIndex(0);
		setSelectedOption(null);
		setAnswers([]);
		setStartTime(new Date());
		setEndTime(null);
		setTimeRemaining(300);
	};

	// Форматирование времени
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	};

	// Форматирование даты
	const formatDateTime = (date) => {
		return date ? date.toLocaleTimeString() : '--:--:--';
	};

	// Расчет оценки
	const calculateGrade = () => {
		const correctCount = answers.filter(a => a.isCorrect).length;
		const percentage = (correctCount / questions.length) * 100;

		if (percentage >= 85) return '5 (Отлично)';
		if (percentage >= 70) return '4 (Хорошо)';
		if (percentage >= 50) return '3 (Удовлетворительно)';
		return '2 (Неудовлетворительно)';
	};

	// Рендер формы тестирования
	const renderTestForm = () => (
		<div className={styles.testForm}>
			<h2>Тестирование по Excel</h2>
			<div className={styles.timer}>Осталось времени: {formatTime(timeRemaining)}</div>

			<div className={styles.questionContainer}>
				<h3>Вопрос {currentQuestionIndex + 1} из {questions.length}</h3>
				<p>{questions[currentQuestionIndex].question}</p>

				<div className={styles.options}>
					{questions[currentQuestionIndex].options.map((option, index) => (
						<div
							key={index}
							className={`${styles.option} ${selectedOption === index ? styles.selected : ''}`}
							onClick={() => handleOptionSelect(index)}
						>
							{option.text}
						</div>
					))}
				</div>
			</div>

			<button
				className={styles.nextButton}
				onClick={handleNextQuestion}
				disabled={selectedOption === null}
			>
				{currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
			</button>
		</div>
	);

	// Рендер формы результатов
	const renderResultsForm = () => {
		const correctCount = answers.filter(a => a.isCorrect).length;

		return (
			<div className={styles.resultsForm}>
				<h2>Результаты тестирования</h2>

				<div className={styles.resultsContainer}>
					<div className={styles.resultItem}>
						<span>Начало тестирования:</span>
						<span>{formatDateTime(startTime)}</span>
					</div>

					<div className={styles.resultItem}>
						<span>Окончание тестирования:</span>
						<span>{formatDateTime(endTime)}</span>
					</div>

					<div className={styles.resultItem}>
						<span>Правильные ответы:</span>
						<span>{correctCount} из {questions.length}</span>
					</div>

					<div className={styles.resultItem}>
						<span>Неправильные ответы:</span>
						<span>{questions.length - correctCount}</span>
					</div>

					<div className={styles.resultItem}>
						<span>Оценка:</span>
						<span>{calculateGrade()}</span>
					</div>
				</div>

				<button className={styles.exitButton} onClick={restartTest}>
					Выход
				</button>
			</div>
		);
	};

	return (
		<div className={styles.container}>
			{currentForm === 'test' ? renderTestForm() : renderResultsForm()}
		</div>
	);
};

export default ExcelTest;