export function SelectedMovie({ selectedMovieId,cancelSelectedMovieHandler }) {
	return <div>
		{selectedMovieId}
	<button onClick={cancelSelectedMovieHandler}>⬅</button>
	</div>;
}
