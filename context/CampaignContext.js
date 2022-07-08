import React, { useState } from 'react';
export const CampaignContext = React.createContext([
	{},
	() => {}
]);

export const CampaignProvider = ( props ) => {

	const [ campaign, setCampaign ] = useState(null);

	return (
		<CampaignContext.Provider value={ [ campaign, setCampaign] }>
			{ props.children }
		</CampaignContext.Provider>
	);
};
