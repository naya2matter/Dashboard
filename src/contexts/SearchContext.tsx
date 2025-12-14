import { createContext, useState, useContext, type ReactNode, type JSX} from 'react'

/**
 * Type definition for the search context
 */
export interface SearchProviderType {
  /** Current search input value */
    searchInput: string
    /** Function to update the search input */
    setSearchInput: (searchInput: string) => void
    }

    /**
     * Props for the SearchProvider component
     */
    interface SearchProviderProps {
    /** Child components */
    children: ReactNode
    }

    /**
     * Context for managing search functionality
     */
    export const SearchContext = createContext<SearchProviderType | null>(null)

    /**
     * Hook to use the search context
     * @throws Error if used outside of SearchProvider
     */
    // eslint-disable-next-line react-refresh/only-export-components
    export const useSearch = (): SearchProviderType => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
    }

    /**
     * Provider component for search functionality
     */
    export const SearchProvider = ({
    children,
    }: SearchProviderProps): JSX.Element => {
    const [searchInput, setSearchInput] = useState<string>('')

    return (
        <SearchContext.Provider value={{ searchInput, setSearchInput }}>
        {children}
        </SearchContext.Provider>
    )
}
