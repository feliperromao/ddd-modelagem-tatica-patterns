import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer implements CustomerInterface {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required to activade a customer")
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    setAddress(address: Address) {
        this._address = address;
    }
    
    get address():Address {
        if (this._address) {
            return this._address
        }
        return null;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }
    get id(): string {
        return this._id
    }

    isActive(): boolean {
        return this._active
    }
}