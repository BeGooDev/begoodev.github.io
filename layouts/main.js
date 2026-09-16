import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout(props) {
    const {header} = props;

    return (
        <>
            <Header {...header} />
            <main id="main_content" className="pt-16">{props.children}</main>
            <Footer/>
        </>
    )

}

MainLayout.defaultProps = {
    header: {},
    footer: {}
}

