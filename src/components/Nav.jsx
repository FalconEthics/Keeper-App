export function Nav() {
	return (
		<>
			<nav className={"flex flex-row h-20 p-4 justify-between bg-amber-300/75 drop-shadow-xl"}>
				<div className={"flex flex-row p-2 space-x-2"}>
					<img src="/logo.png" alt="logo" className={"h-full drop-shadow-xl"}/>
					<span className={"p-1 text-xl font-sans drop-shadow-xl"}>Keeper-App</span>
				</div>
				<div className={"flex flex-row p-2"}>
					<button>
						login
					</button>
				</div>
			</nav>
		</>
	)
}