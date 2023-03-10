import { ChangeEvent, useEffect, useRef, useState } from "react";
import "@/assets/styles/generator.scss";
import { generatePassword } from "./utils";

const colorWeak = "#eb130c";
const colorGood = "#31f399 ";
const colorBest = "#1fff3d";

export default function Generator() {
	const [password, setPassword] = useState("");

	const [length, setLength] = useState(64);

	const [numbers, setNumbers] = useState(true);
	const [symbols, setSymbols] = useState(true);
	const [uppercase, setUppercase] = useState(true);
	const [lowercase, setLowercase] = useState(true);
	const [similar, setSimilar] = useState(false);
	const [ambiguous, setAmbiguous] = useState(false);

	const copiedTooltipRef = useRef<HTMLDivElement>(null);
	const lengthCounterRef = useRef<HTMLInputElement>(null);

	function copy() {
		navigator.clipboard.writeText(password);

		if (copiedTooltipRef.current) {
			copiedTooltipRef.current.style.animation = "tooltipAnimation 200ms";
			copiedTooltipRef.current.style.opacity = "1";

			setTimeout(() => {
				if (copiedTooltipRef.current) {
					copiedTooltipRef.current.style.opacity = "0";
					copiedTooltipRef.current.style.animation = "";
				}
			}, 1000);
		}
	}

	function generate() {
		setPassword(
			generatePassword({
				length: length,
				numbers: numbers,
				symbols: symbols,
				uppercase: uppercase,
				lowercase: lowercase,
				excludeSimilar: similar,
				excludeAmbiguous: ambiguous,
			})
		);
	}

	useEffect(() => {
		generate();
	}, []);

	useEffect(() => {
		if (lengthCounterRef.current) {
			if (length >= 8 && length <= 16) {
				lengthCounterRef.current.style.borderColor = colorWeak;
			} else if (length > 16 && length <= 256) {
				lengthCounterRef.current.style.borderColor = colorGood;
			} else if (length > 256 && length <= 2048) {
				lengthCounterRef.current.style.borderColor = colorBest;
			}
		}
	}, [length]);
	return (
		<div className="generator">
			<div id="headline">
				<h1>SecureKeyGen</h1>
				<h3>Generate secure passwords</h3>
			</div>
			<div id="content">
				<div id="result">
					<p id="password">
						<code>{password}</code>
					</p>
					<button onClick={copy} id="copy">
						Copy
					</button>
					<div ref={copiedTooltipRef} id="copiedTooltip">
						Copied!
					</div>
				</div>
				<button onClick={generate}>Generate</button>
				<div id="length">
					<label>Length</label>
					<input
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							// setLength but clamp it between 8 and 2048
							setLength(Math.min(2048, Math.max(8, parseInt(e.target.value))));
						}}
						type="range"
						min="8"
						max="2048"
						value={length}
					/>
					<input
						type="number"
						ref={lengthCounterRef}
						onInput={(e: ChangeEvent<HTMLInputElement>) => {
							// setLength but clamp it between 8 and 2048
							setLength(Math.min(2048, Math.max(8, parseInt(e.target.value))));
						}}
						value={length}
						max={2048}
						min={8}
					/>
				</div>
				<div id="checkboxes">
					<div>
						<div className="checkboxContainer">
							<input
								type="checkbox"
								checked={uppercase}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setUppercase(e.target.checked);
								}}
							/>
							<label>Include uppercase</label>
						</div>
						<div className="checkboxContainer">
							<input
								type="checkbox"
								checked={lowercase}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setLowercase(e.target.checked);
								}}
							/>
							<label>Include lowercase</label>
						</div>
						<div className="checkboxContainer">
							<input
								type="checkbox"
								checked={numbers}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setNumbers(e.target.checked);
								}}
							/>
							<label>Include numbers</label>
						</div>
					</div>
					<div>
						<div className="checkboxContainer">
							<input
								type="checkbox"
								checked={symbols}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setSymbols(e.target.checked);
								}}
							/>
							<label>Include symbols (@#$%...)</label>
						</div>
						<div className="checkboxContainer">
							<input
								type="checkbox"
								checked={similar}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setSimilar(e.target.checked);
								}}
							/>
							<label>Exclude similar characters</label>
						</div>
						<div className="checkboxContainer">
							<input
								type="checkbox"
								checked={ambiguous}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setAmbiguous(e.target.checked);
								}}
							/>
							<label>
								Exclude:
								&#123;&#125;&#91;&#93;&#40;&#41;&#47;&#92;&#39;&#34;&#96;&#126;&#44;&#59;&#58;&#46;&lt;&gt;
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
