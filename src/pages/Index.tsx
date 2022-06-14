import styled from '@emotion/styled';
import { Button, Modal, TextField } from '@mui/material';
import { DocumentData } from 'firebase/firestore/lite';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '../components/card';
import { createWorkout, getWorkouts } from '../firebase-config';

// grid styled component 6 columns wide
const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-gap: 1rem;
`;

const workoutArray: DocumentData[] = await getWorkouts();

// styled div called TitleDiv with display flex and flex direction row
// and justify content space between
const TitleDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const CenteredDiv = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400;
	background-color: #fff;
	/* box-shadow: 24; */
	border-color: #fff;
	border-radius: 0.5rem;
	padding-inline: 2rem;
	text-align: center;
`;

function App() {
	// open and close modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// pick up changes in value of input fields
	const [titleState, setTitleState] = useState('');
	const [descriptionState, setDescriptionState] = useState('');
	const [imageState, setImageState] = useState('');

	const [exerciseList, setExerciseList] = useState([
		{ name: '', value: false },
	]);

	// add exercise to exercise list
	const addExercise = () => {
		setExerciseList([...exerciseList, { name: '', value: false }]);
	};

	// remove exercise from exercise list
	const removeExercise = (index: number) => {
		const newExerciseList = [...exerciseList];
		newExerciseList.splice(index, 1);
		setExerciseList(newExerciseList);
	};

	const handleExerciseChange = (
		e: { target: { value: string } },
		index: number
	) => {
		const newExerciseList = [...exerciseList];
		newExerciseList[index].name = e.target.value;
		setExerciseList(newExerciseList);
	};

	// TestingDoc();

	console.dir(exerciseList);

	return (
		<>
			<TitleDiv>
				<h1>Workouts</h1>
				<Button variant="contained" onClick={handleOpen}>
					Add workout
				</Button>
			</TitleDiv>
			<Grid>
				{workoutArray.map((workout) => (
					<Card
						key={workout.id}
						id={workout.id}
						title={workout.title}
						image={workout.image}
						description={workout.description}
					/>
				))}
			</Grid>
			<Modal open={open} onClose={handleClose}>
				<CenteredDiv>
					<h2>New workout </h2>
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
						<span>Exercises</span>
						{exerciseList.map((exercise, index) => (
							<>
								<div
									key={index}
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<TextField
										fullWidth
										hiddenLabel
										id="filled-hidden-label-normal"
										placeholder={`exercise ${index + 1}`}
										variant="filled"
										margin="normal"
										size="small"
										onChange={(e) => handleExerciseChange(e, index)}
									/>
									{exerciseList.length > 1 && (
										<div
											style={{
												marginLeft: '1rem',
												marginTop: '.5rem',
												height: '100%',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<DeleteIcon
												color="error"
												onClick={() => removeExercise(index)}
											/>
										</div>
									)}
								</div>

								{exerciseList.length - 1 === index && exerciseList.length < 8 && (
									<Button
										variant="contained"
										color="primary"
										onClick={() => addExercise()}
										// onClick={() =>
										// 	setExerciseList([
										// 		...exerciseList,
										// 		{ name: '', value: false },
										// 	])
										// }
									>
										Add exercise
									</Button>
								)}
							</>
						))}
						<Button
							fullWidth
							onClick={() => {
								createWorkout(
									titleState,
									descriptionState,
									imageState,
									exerciseList
								);

								// close modal
								// handleClose();
								// // delay refresh so users so the correct information
								// setTimeout(function () {
								// 	window.location.reload();
								// }, 500);
							}}
						>
							Send
						</Button>
					</form>
				</CenteredDiv>
			</Modal>
		</>
	);
}

export default App;
