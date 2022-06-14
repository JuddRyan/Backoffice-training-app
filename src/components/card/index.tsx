import styled from '@emotion/styled';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { removeWorkout, updateWorkouts } from '../../firebase-config';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
	title?: string;
	description?: string;
	image?: string;
	id?: string;
};

const StyledDiv = styled.div`
	min-width: 10rem;
	height: 12rem;
	border-radius: 0.5rem;
	background-color: #c9c9c9;
	border: 1px solid #000;
	cursor: pointer;
	/* overflow: hidden; */
`;

const CenteredDiv = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400;
	background-color: #fff;
	border-color: #fff;
	border-radius: 0.5rem;
	padding-inline: 2rem;
	text-align: center;
`;

// span with fontsize of 1.5rem
const StyledSpan = styled.span`
	font-size: 1.2rem;
`;

// styled img with object fit
const StyledImg = styled.img`
	object-fit: cover;
	width: 100%;
	height: 50%;
`;

// styled iconwrapper with onhover show pointer
const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const CardText = styled.div`
	margin-inline: 0.5rem;
	overflow-y: auto;
	height: 48%;
	width: 95%;

	// styled scrollbar
	::-webkit-scrollbar {
		width: 0.5rem;
		color: #ffffff;
	}
	::-webkit-scrollbar-thumb {
		/* Foreground */
		background: #000000;
		border-radius: 0.5rem;
	}
	::-webkit-scrollbar-track {
		/* Background */
		background: #ffffff;
		border-radius: 0.5rem;
	}
`;

const Card = ({ title, description, image, id }: Props) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [titleState, setTitleState] = useState(title);
	const [descriptionState, setDescriptionState] = useState(description);
	const [imageState, setImageState] = useState(image);

	return (
		<>
			<StyledDiv style={{ position: 'relative' }} onClick={handleOpen}>
				<StyledImg src={image} alt="" />
				<CardText>
					<StyledSpan>{title}</StyledSpan>
					<p>{description}</p>
				</CardText>
			</StyledDiv>

			<Modal open={open} onClose={handleClose}>
				<CenteredDiv>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							maxWidth: '80%',
							marginInline: 'auto',
						}}
					>
						<h2>Edit {title}</h2>
						<IconWrapper>
							<DeleteIcon
								color="error"
								onClick={() => {
									removeWorkout(id); // close modal
									handleClose();
									// delay refresh so users so the correct information
									setTimeout(function () {
										window.location.reload();
									}, 500);
								}}
							/>
						</IconWrapper>
					</div>
					<form style={{ maxWidth: '80%', marginInline: 'auto' }} action="">
						<TextField
							fullWidth
							hiddenLabel
							id="filled-hidden-label-small"
							placeholder="title"
							variant="filled"
							size="small"
							margin="normal"
							onChange={(e) => setTitleState(e.target.value)}
						/>
						<TextField
							fullWidth
							hiddenLabel
							id="filled-hidden-label-normal"
							placeholder="description"
							variant="filled"
							margin="normal"
							size="small"
							onChange={(e) => setDescriptionState(e.target.value)}
						/>
						<TextField
							fullWidth
							hiddenLabel
							id="filled-hidden-label-normal"
							placeholder="image url"
							variant="filled"
							margin="normal"
							size="small"
							onChange={(e) => setImageState(e.target.value)}
						/>
						<Button
							fullWidth
							onClick={() => {
								// getWorkoutId();
								updateWorkouts(id, titleState, descriptionState, imageState);
								// close modal
								handleClose();
								// delay refresh so users so the correct information
								setTimeout(function () {
									window.location.reload();
								}, 500);
							}}
						>
							Send
						</Button>
					</form>
				</CenteredDiv>
			</Modal>
		</>
	);
};

export default Card;
