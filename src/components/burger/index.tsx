interface IBurger {
    className: string;
}

export const Burger = ({}: IBurger) => {
    return (
        <div>
            <button>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    );
};
