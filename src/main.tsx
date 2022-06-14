import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { appWindow } from '@tauri-apps/api/window';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

import './index.css';
import Appbar from './components/appbar';
import routes from '~react-pages';
import Sidebar from './components/sidebar';
import styled from '@emotion/styled';

appWindow.setDecorations(false);

const StyledDiv = styled.div<{ paddingTop?: string }>`
	padding-top: ${(props) => props.paddingTop};
	padding-left: 4rem;
	padding-right: 1rem;
`;

const App = () => {
	if (window.__TAURI_METADATA__) {
		return (
			<StyledDiv paddingTop="1rem">
				<Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
			</StyledDiv>
		);
	}

	return (
		<StyledDiv>
			<Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
		</StyledDiv>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Router>
		<Appbar></Appbar>

		<App />

		<Sidebar>
			<li>
				<a href="/">
					<HomeIcon />
				</a>
			</li>
			<li>
				<a href="/setting">
					<SettingsIcon />
				</a>
			</li>
		</Sidebar>
	</Router>
);
