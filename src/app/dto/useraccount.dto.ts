
//Creating a UserAccount class, so that later we can create instances of type 'UserAccount'

export class UserAccount
{
    private _username: string;
    private _password: string;

    //Class constructor
    constructor (
        username: string,
        password: string
    )
    {
        this._username = username;
        this._password = password;
    }

    //Getters and setters
    public get username(): string
    {
        return this._username;
    }

    public set username(username: string)
    {
        this._username = username;
    }

    public get password(): string
    {
        return this._password;
    }

    public set password(password: string)
    {
        this._password= password;
    }

}