import { appWindow } from '@tauri-apps/api/window';
import styled from '@emotion/styled';

type DivProps = {
	backgroundColor?: string;
};

// styled div with changeable background color called styledDiv
const StyledDiv = styled.div<DivProps>`
	// on hover change background color to prop backgroundColor
	&:hover {
		background-color: ${(props) => props.backgroundColor};
	}
`;

type AppbarProps = {
	children?: React.ReactNode;
};

const Appbar = ({ children }: AppbarProps) => {
	if (window.__TAURI_METADATA__) {
		return (
			<div data-tauri-drag-region className="titlebar">
				<StyledDiv
					className="titlebar-button"
					id="titlebar-minimize"
					onClick={() => appWindow.minimize()}
				>
					<img
						src="https://api.iconify.design/mdi:window-minimize.svg"
						alt="minimize"
					/>
				</StyledDiv>
				<StyledDiv
					className="titlebar-button"
					id="titlebar-maximize"
					onClick={() => appWindow.toggleMaximize()}
				>
					<img
						src="https://api.iconify.design/mdi:window-maximize.svg"
						alt="maximize"
					/>
				</StyledDiv>
				<StyledDiv
					backgroundColor="#e81123"
					className="titlebar-button"
					id="titlebar-close"
					onClick={() => appWindow.close()}
				>
					<img src="https://api.iconify.design/mdi:close.svg" alt="close" />
				</StyledDiv>
			</div>
		);
	}

	return null;
};

export default Appbar;
