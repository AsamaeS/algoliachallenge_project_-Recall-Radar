'use client';

import React, { useState, useEffect } from 'react';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Hits, useInstantSearch, Configure } from 'react-instantsearch';
import { searchClient } from '@/lib/algolia';
import { ShieldCheck, ShieldAlert, ShieldQuestion, Search as SearchIcon, AlertTriangle, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'product_recalls';

interface RecallHit {
    objectID: string;
    product_name: string;
    brand: string;
    model: string;
    risk_level: 'Serious' | 'Medium' | string;
    source: string;
    description: string;
    batch_number?: string;
    _rankingInfo?: {
        nbTypos: number;
        firstMatchedAttribute: string;
        [key: string]: unknown;
    };
}

const EmptyQueryBoundary = ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) => {
    const { indexUiState } = useInstantSearch();
    if (!indexUiState.query) {
        return <>{fallback}</>;
    }
    return <>{children}</>;
};

const ResultsCounter = ({ onStateChange }: { onStateChange: (state: 'RED' | 'ORANGE' | 'GREEN' | 'IDLE') => void }) => {
    const { results, indexUiState } = useInstantSearch();

    useEffect(() => {
        if (!indexUiState.query) {
            onStateChange('IDLE');
            return;
        }

        if (results.nbHits === 0) {
            onStateChange('GREEN');
        } else {
            const hasExactMatch = results.hits.some((hit) => {
                const recallHit = hit as unknown as RecallHit;
                return recallHit._rankingInfo?.nbTypos === 0;
            });

            if (hasExactMatch) {
                onStateChange('RED');
            } else {
                onStateChange('ORANGE');
            }
        }
    }, [results, indexUiState.query, onStateChange]);

    return null;
};

const CustomSearchBox = () => {
    const { indexUiState, refine } = useInstantSearch();
    const [inputValue, setInputValue] = useState(indexUiState.query || '');

    // Sync input value with external query changes (e.g. initial state)
    useEffect(() => {
        setInputValue(indexUiState.query || '');
    }, [indexUiState.query]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        refine(newValue);
    };

    const handleClear = () => {
        setInputValue('');
        refine('');
    };

    return (
        <div className="relative group">
            <input
                id="search"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="e.g. ToyWorld Teddy or SafeSeat"
                className="w-full h-14 pl-12 pr-12 bg-white border-2 border-slate-200 rounded-xl focus:border-brand-accent focus:ring-0 transition-all text-lg gov-shadow text-slate-900"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-brand-accent transition-colors" />

            {inputValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all"
                    aria-label="Clear search"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

const HitCard = ({ hit }: { hit: RecallHit }) => (
    <div className="gov-card mb-4 border-l-4 border-l-status-red hover:border-l-brand-accent transition-all animate-in slide-in-from-left-2 duration-300">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-brand-primary">{hit.product_name}</h3>
            <span className={cn(
                "px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider",
                hit.risk_level === 'Serious' ? "bg-red-100 text-status-red" : "bg-orange-100 text-status-orange"
            )}>
                {hit.risk_level} Risk
            </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div>
                <span className="text-slate-500 block">Brand / Model</span>
                <span className="font-medium">{hit.brand} {hit.model}</span>
            </div>
            <div>
                <span className="text-slate-500 block">Source</span>
                <span className="font-medium">{hit.source}</span>
            </div>
        </div>
        <div className="text-sm bg-slate-50 p-3 rounded border border-slate-100 italic text-slate-700">
            {hit.description}
        </div>
    </div>
);

export default function Search() {
    const [searchState, setSearchState] = useState<'RED' | 'ORANGE' | 'GREEN' | 'IDLE'>('IDLE');

    return (
        <InstantSearchNext
            searchClient={searchClient}
            indexName={INDEX_NAME}
            future={{ preserveSharedStateOnUnmount: true }}
        >
            <Configure getRankingInfo={true} hitsPerPage={10} />
            <div className="w-full max-w-2xl mx-auto space-y-8">
                {/* Search Input Section */}
                <div>
                    <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-2">
                        Search by Brand, Model, or Product Name
                    </label>
                    <CustomSearchBox />
                </div>

                <ResultsCounter onStateChange={setSearchState} />

                {/* Status Badge */}
                <div className="flex justify-center transition-all duration-300 min-h-[56px]">
                    {searchState === 'RED' && (
                        <div className="flex items-center gap-2 bg-red-100 text-status-red px-6 py-3 rounded-full border-2 border-status-red font-bold text-lg animate-in fade-in zoom-in">
                            <ShieldAlert className="w-6 h-6" />
                            ⚠️ Product Recalled
                        </div>
                    )}
                    {searchState === 'ORANGE' && (
                        <div className="flex items-center gap-2 bg-orange-100 text-status-orange px-6 py-3 rounded-full border-2 border-status-orange font-bold text-lg animate-in fade-in zoom-in text-center">
                            <AlertTriangle className="w-6 h-6 shrink-0" />
                            ⚠️ Possible recall match — verify brand/model details
                        </div>
                    )}
                    {searchState === 'GREEN' && (
                        <div className="flex items-center gap-2 bg-green-100 text-status-green px-6 py-3 rounded-full border-2 border-status-green font-bold text-lg animate-in fade-in zoom-in">
                            <ShieldCheck className="w-6 h-6" />
                            ✅ No recall found
                        </div>
                    )}
                </div>

                {/* Results Area */}
                <div className="min-h-[200px]">
                    <EmptyQueryBoundary fallback={
                        <div className="text-center py-12 text-slate-400">
                            <ShieldQuestion className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>Enter a product name to check its safety status.</p>
                        </div>
                    }>
                        {searchState === 'GREEN' ? (
                            <div className="gov-card border-l-4 border-l-status-green animate-in slide-in-from-bottom-4 duration-500">
                                <p className="text-slate-600">
                                    We could not find any official recall notices matching your search criteria.
                                    However, please ensure you have checked the brand and model name correctly.
                                </p>
                                <p className="text-xs text-slate-400 mt-4 border-t pt-3">
                                    Disclaimer: Based on official recall databases (RAPEX, DGCCRF, etc.) as indexed in our system.
                                </p>
                            </div>
                        ) : (
                            <Hits hitComponent={HitCard} />
                        )}
                    </EmptyQueryBoundary>
                </div>
            </div>
        </InstantSearchNext>
    );
}
