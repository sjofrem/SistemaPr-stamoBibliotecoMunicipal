import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

export const Login = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			<div className="px-5 min-h-screen flex justify-content-center align-items-center">
				<div className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
					<div className="mb-4">
						<div className="text-900 text-xl font-bold mb-2">Log in</div>
						<span className="text-600 font-medium">Please enter your details</span>
					</div>
					<div className="flex flex-column">
						<span className="p-input-icon-left w-full mb-4">
							<i className="pi pi-envelope"></i>
							<InputText id="email" type="text" className="w-full md:w-25rem" placeholder="Email" />
						</span>
						<span className="p-input-icon-left w-full mb-4">
							<i className="pi pi-lock"></i>
							<InputText id="password" type="password" className="w-full md:w-25rem" placeholder="Password" />
						</span>
						<div className="mb-4 flex flex-wrap gap-3">
							<div>
								<Checkbox name="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.checked)} className="mr-2"></Checkbox>
								<label htmlFor="checkbox" className="text-900 font-medium mr-8">
                                    Remember Me
								</label>
							</div>
							<a className="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300">Reset password</a>
						</div>
						<Button label="Log In" className="w-full" onClick={() => navigate("/")}></Button>
					</div>
				</div>
			</div>
		</>
	);
};
