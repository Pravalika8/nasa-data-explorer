import React from "react"
import { AlertType } from "../../constants/InputConstant"

export default function Alert({ type, message }) {
    return (
        <React.Fragment>
            <div className="fixed bottom-12 max-h-32 right-2 w-full max-w-sm">
                {AlertType.ERROR === type && <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{message}</p>
                </div>}
                {AlertType.SUCCESS === type && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                    <p className="font-bold">Success</p>
                    <p>{message}</p>
                </div>}
            </div>
        </React.Fragment>
    )
}