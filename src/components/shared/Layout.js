import Footer from '../Footer'
import Nav from '../Navigation/Nav'

function Layout({ children }) {
	return (
		<div>
			<div className="bg-blur2 tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-20 tw-max-w-screen ">
				<Nav />
			</div>
			<div className="tw-mt-2">{children}</div>
			<div>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
