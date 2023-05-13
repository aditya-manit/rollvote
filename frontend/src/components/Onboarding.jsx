import './css/Onboarding.css'

const Onboarding = ({address}) => {

    return (
        !address && (
            <div className="onboarding-container">
                <div className="onboarding-card">
                    <h1>
                        Connect Your Wallet To Begin
                    </h1>
                    <p>You will prompted to connect your metamask wallet, add the celestia sovereign rollup chain and
                        switch to it</p>
                </div>

            </div>
        )
    );
};

export default Onboarding;