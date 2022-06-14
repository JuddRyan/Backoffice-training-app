import styled from "@emotion/styled"

type DivProps = {
	variant?: 'web' | 'desktop'
}

type Props = {
	children: React.ReactNode
}

const Side = styled.div<DivProps>`
	background-color: #1f2428;
	width: 3rem;
	height: calc(100vh - 30px);
	height: ${props => props.variant === "web" ? "100vh" : "calc(100vh - 30px)"};
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 1;
`
const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	margin-top: 1rem;
	
	li {
		padding: .3rem .3rem .1rem .3rem; 
		border-radius: .3rem;
		background-color: #484d51;
	}

	a {
		color: #fff;
		
	}
`

const Sidebar = ({children}: Props) => {
	if (!window.__TAURI_METADATA__) {
		return (
			<Side variant={'web'}>
				<NavList>
					{children}
				</NavList>
			</Side>
		)
	}

	return (
		<Side>
			<NavList>
				{children}
			</NavList>
		</Side>
	);
}

export default Sidebar