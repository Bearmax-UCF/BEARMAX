import { useState } from "react";
import { GSRGraph } from "./GSRGraph";
import "./Graph.css";

export const GraphWrapper = () => {
	const [recordingStart, setRecordingStart] = useState(null);
	const [recording, setRecording] = useState(false);
	const [saveOptions, setSaveOptions] = useState({ file: true, db: true });

	return (
		<div id="graphContainer">
			<h3 id="graphTitle">Galvanic Skin Response</h3>
			<div className="graph">
				<GSRGraph
					recording={recording}
					recordingStart={recordingStart}
					setRecordingStart={setRecordingStart}
					saveOptions={saveOptions}
				/>

				<div id="gsrOptionRow">
					<div id="gsrCheckContainer">
						<div className="gsrCheck">
							<input
								className="gsrOptionCheck"
								type="checkbox"
								checked={saveOptions.file}
								onChange={() =>
									setSaveOptions({
										...saveOptions,
										file: !saveOptions.file,
									})
								}
							/>
							<span
								className="gsrOptionLabel"
								onClick={() =>
									setSaveOptions({
										...saveOptions,
										file: !saveOptions.file,
									})
								}
							>
								Save to CSV
							</span>
						</div>
						<div className="gsrCheck">
							<input
								className="gsrOptionCheck"
								type="checkbox"
								checked={saveOptions.db}
								onChange={() =>
									setSaveOptions({
										...saveOptions,
										db: !saveOptions.db,
									})
								}
							/>
							<span
								className="gsrOptionLabel"
								onClick={() =>
									setSaveOptions({
										...saveOptions,
										db: !saveOptions.db,
									})
								}
							>
								Save to Database
							</span>
						</div>
					</div>
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
		</div>
	);
};
