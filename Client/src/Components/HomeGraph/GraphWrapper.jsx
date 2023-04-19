import { useState } from "react";
import { GSRGraph } from "./GSRGraph";

export const GraphWrapper = () => {
	const [recordingStart, setRecordingStart] = useState(null);
	const [recording, setRecording] = useState(false);

	return (
		<div id="graphContainer">
			<h3 id="graphTitle">Galvanic Skin Response</h3>
			<div className="graph">
				<GSRGraph
					recording={recording}
					recordingStart={recordingStart}
					setRecordingStart={setRecordingStart}
				/>
				<button
					id="recordGSRButton"
					className="dashButton"
					onClick={() => {
						if (!recording) setRecordingStart(new Date());
						setRecording(!recording);
					}}
				>
					{recording ? "Stop Recording" : "Start Recording"}
				</button>
			</div>
		</div>
	);
};
