import axios from "axios";

class TokenProvider {
	private token?: string;
	private expireAt?: Date;

	private async refreshToken() {
		const { CLIENT_ID, CLIENT_SECRET } = import.meta.env;

		try {
			const {
				data: { access_token, expires_in },
			} = await axios.post(
				"https://osu.ppy.sh/oauth/token",
				`client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&scope=public`,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			);
			const now = new Date();

			this.token = access_token;
			this.expireAt = new Date(now.getTime() + expires_in * 1000);
		} catch (e) {
			console.error(e);
		}
	}

	async getToken() {
		if (this.isExpired()) await this.refreshToken();
		return this.token;
	}

	private isExpired(): boolean {
		if (!this.expireAt || !this.token) return true;

		const now = new Date();
		if (now > this.expireAt) return true;

		return false;
	}
}

const tokenProvider = new TokenProvider();
export default tokenProvider;