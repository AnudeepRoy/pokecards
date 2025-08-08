export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <img alt="logo" src={'/assets/logo.svg'} />
            </div>
            <div className="header-right">
                <h2>Right</h2>
            </div>
        </header>
    )
}