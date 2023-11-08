import React from 'react';
import './styles/App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignIn from './components/SignIn/SignIn';
import Menu from './components/Menu/Menu';

function App() {
	const [user] = useAuthState(auth);
	return (
		<body>
			<div className="App">
				{user && (
					<section className='menuContainer'>
						<Menu />
					</section>
				)}
				<section className='chat'>
					{user ? <ChatRoom /> : <SignIn />}
				</section>
			</div>
		</body>
	);
}

export default App;
