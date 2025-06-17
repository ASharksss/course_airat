import './App.css';
import {useState} from "react";
import Exersise from "./exersise/Exersise";
import NumberSorter from "./numberSorter/NumberSorter";
import Test from "./test/Test";

function App() {
	const [tab, setTab] = useState(0)

	const handleBack = () => setTab(0)

	return (
		<div className="App">
			{tab === 0 ? (
				<div className="main-menu">
					<div className="developer-info">
						<h2>Разработчик</h2>
						<div className="info-card">
							<p className="name">Мендыханов Айрат Ильщатович</p>
							<p className="group">Группа: 24174</p>
							<p className="year">2025 год</p>
						</div>
					</div>

					<div className="menu">
						<h2>Выберите задание:</h2>
						<button className="menu-button" onClick={() => setTab(1)}>Первое задание</button>
						<button className="menu-button" onClick={() => setTab(2)}>Второе задание</button>
						<button className="menu-button" onClick={() => setTab(3)}>Третье задание</button>
					</div>
				</div>
			) : (
				<>
					<button className="back-button" onClick={handleBack}>Главное меню</button>
					{tab === 1 ? <Exersise/> : tab === 2 ? <NumberSorter/> : <Test/>}
				</>
			)}
		</div>
	);
}

export default App;
