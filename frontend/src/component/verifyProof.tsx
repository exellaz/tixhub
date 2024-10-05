"use server"; //use server-side code

import { VerificationLevel } from "@worldcoin/idkit-core"; //is to define orb or device fir verification
import { verifyCloudProof } from "@worldcoin/idkit-core/backend"; //is to verify the proof from the backend

//define an interface for the response from the verify function
export type VerifyReply = {
  //boolean value that indicates whether the verification process was successful or not.
  success: boolean; // if verify success, the value will be true, if verify failed, the value will be false
  
  //optional string that contains an error code if the verification failed.
  code?: string; // if verify failed, the error code, if verify success, the code will be null
 
  //optional string or null value that indicates which attribute of the proof failed verification.
  attribute?: string | null; // if verify failed, the attribute that failed verification, if verify success, the attribute will be null
 
  //optional string that provides a detailed error message if the verification failed.
  detail?: string; // if verify failed, the detailed error message, if verify success, the detail will be null
};

//define an interface for the request to the verify function
//proof: The proof to verify
//signal: An optional signal to cancel the verification
interface IVerifyRequest {
  proof: {
	
	//nullfier_hash: unique identifier for the proof and prevent it for reused
    nullifier_hash: string; //sring that contains the nullifier hash of the proof

	//merkle_root: represents the entire Merkle tree structure of the proof
    merkle_root: string; // string that contains the merkle root of the proof

	//representation of the proof's structure and content
    proof: string; // string that contains the proof data

	//verification_level: specifies orb or device for verification
    verification_level: VerificationLevel; //enum that specifies is orb of device for verification
  };

  //used to interrupt the verification process before it completes.
  signal?: string; //string containing a signal to cancel the verification
}

const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`; // The app ID to use for verification
const action = process.env.NEXT_PUBLIC_WLD_ACTION as string; // The action to use for verification

export async function verify(
  proof: IVerifyRequest["proof"], //compare the "proof" from the request to the proof from the backend and result will be stored in the "proof" variable
  signal?: string //used to terminate the verification process if needed
): Promise<VerifyReply> { //returns a Promise of type VerifyReply, indicating the result of the verification.
  const verifyRes = await verifyCloudProof(proof, app_id, action, signal); // Call the IDKit backend to verify the proof using the app ID and action
  if (verifyRes.success == true) { // Check if the verification was successful or not
    return { success: true }; // Return a success response if the verification was successful
  } else {
    return { success: false, code: verifyRes.code, attribute: verifyRes.attribute, detail: verifyRes.detail }; // Return a fail response if the verification was failed
	//success: false =  indicates that the verification was unsuccessful
	//code: verifyRes.code =  provide more specific information about the reason for the failure
	//attribute: verifyRes.attribute = contains the attribute of the proof that failed verification, if applicable
	//detail: verifyRes.detail = contains a detailed error message describing the reason for the failure
  }
}