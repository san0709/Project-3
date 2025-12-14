import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    return (
        <WidgetWrapper>
            <FlexBetween>
                <h5 className="dark:text-neutral-light font-medium">Sponsored</h5>
                <p className="text-neutral-medium">Create Ad</p>
            </FlexBetween>
            <img
                src="http://localhost:3001/assets/info4.png"
                alt="advert"
                className="rounded-xl my-3 w-full"
            />
            <FlexBetween>
                <p className="text-neutral-main dark:text-neutral-light">MikaCosmetics</p>
                <p className="text-neutral-medium">mikacosmetics.com</p>
            </FlexBetween>
            <p className="text-neutral-medium my-2">
                Your pathway to stunning and immaculate beauty and made sure your skin
                is exfoliating skin and shining like light.
            </p>
        </WidgetWrapper>
    );
};

export default AdvertWidget;
